import { useState } from "react";
import {
    Input,
    Button,
    SimpleGrid,
    InputRightElement,
    InputGroup,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Image,
  } from '@chakra-ui/react';

export const SearchBar = ({users,getChatsfn,setPerson,setBack}) => {
    const [search,setSearch] = useState("");
    const [result,setResult] = useState([]);

    const handleSearchfn = () => {
        console.log("search:",search);
        let arr = users.map((el,i)=>{
            if(el.name.toLowerCase().includes(search.toLowerCase())){
                return el;
            }else{
                return '';
            }
        })
        setResult(arr);
        console.log('arr:',arr,"\nusers:",users)
        setSearch(""); 
    }
  
    return <SimpleGrid ml='5px'>
        <Menu>
            <SimpleGrid display='flex' alignSelf='center' gap='5px' >
            <Input bg='white'
                    w='200px'
                    pr='4.5rem'
                    placeholder='Enter the name'
                    value={search}
                    onChange={(e)=>{
                        setSearch(e.target.value)
                    }}
                    onKeyPress = {(e)=>{
                        if(e.key==='Enter'){
                            handleSearchfn();
                        }
                    }}
                />
                <MenuButton w='80px' onClick={handleSearchfn} as={Button} >Search</MenuButton>
            </SimpleGrid>
            <MenuList  display='grid' br='200px'>
                {
                result.map((el,i)=>{
                    if(el){
                           return <MenuItem minH='48px'
                                onClick={(e)=>{
                                    setPerson(el)
                                    getChatsfn(el);
                                    setBack(false);
                                }} key={i}
                           >
                            <Image
                            boxSize='2rem'
                            borderRadius='full'
                            src={el.img}
                            alt={el.name}
                            mr='12px'
                            />
                            <span>{el.name}</span>
                        </MenuItem>
                    }
                })
                }
            </MenuList>
        </Menu>
    </SimpleGrid>
  }
  