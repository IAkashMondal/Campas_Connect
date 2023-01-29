import { useEffect ,  useState } from "react";
import { SimpleGrid,Image, Text, Heading, Box, InputGroup, Input, InputRightElement, Button, Alert, AlertIcon } from "@chakra-ui/react";
import { Search, SearchBar } from "./Search";
import { Group } from "./Group";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { ArrowBackIcon, HamburgerIcon } from '@chakra-ui/icons';

const AllUsers = [
    {
      img : "https://i.pinimg.com/564x/d9/a4/6e/d9a46e4a5bc342952452055f46f2d935.jpg",
      name : "Raghu" ,
      lastMsg : "Hello Raghu",
      lastMessageTime : "11:30am"
    },
    {
      img : "https://i.pinimg.com/564x/d9/a4/6e/d9a46e4a5bc342952452055f46f2d935.jpg",
      name : "Satish" ,
      lastMsg : "Hello world",
      lastMessageTime : "11:30am"
    },
    {
      img : "https://i.pinimg.com/564x/d9/a4/6e/d9a46e4a5bc342952452055f46f2d935.jpg",
      name : "Ravi" ,
      lastMsg : "Hello world",
      lastMessageTime : "11:30am"
    },
    {
      img : "https://i.pinimg.com/564x/d9/a4/6e/d9a46e4a5bc342952452055f46f2d935.jpg",
      name : "Nandu" ,
      lastMsg : "Hello world",
      lastMessageTime : "11:30am"
    },
    ]

const AllChats = [
    {
        msg : "hi",
        sender : "1"
    },
    {
        msg : "hi",
        sender : "2"
    },
    {
        msg : "how r u",
        sender : "1"
    },
    {
        msg : "Fine",
        sender : "2"
    },
    {
        msg : "How r you?",
        sender : "2"
    },
    {
        msg : "Are u sleeping?",
        sender : "2"
    },
    {
        msg : "No",
        sender : "1"
    },
    {
        msg : "good Night",
        sender : "2"
    },
    {
        msg : "gn",
        sender : "1"
    },
]

const logo = "https://i.pinimg.com/564x/d9/a4/6e/d9a46e4a5bc342952452055f46f2d935.jpg";


// users.map 
//  chats.map

export const ChatSection = () => {
    const [users,setUsers] = useState([]);
    const [person,setPerson] = useState(AllUsers[0]);
    const [message,setMessage] = useState("");
    const [chats,setChats] = useState([]);
    const [ht,setHt] = useState(window.outerHeight);
    const [backgroundImg,setBackgroundImg] = useState('https://i.pinimg.com/originals/e3/42/aa/e342aa99d92cb8660fa1918986c595d0.gif')
    const [backImgUrl,setBackImgUrl]= useState("");
    const [menu,setMenu] = useState((window.outerWidth < 768)? true : false);
    const [back,setBack] = useState(true);


    const { loginData } = useSelector((store) => store.User);
  const [userData, setUserData] = useState({});

  // -------------- (Token Decode) ---------------
  useEffect(() => {
    if (loginData) {
      setUserData(jwtDecode(loginData.token));
    }
  }, [loginData]);

    window.addEventListener("resize",()=>{
        if(window.outerWidth < 768){
            setMenu(true)
        }else{
            setMenu(false)
        }
        setHt(window.outerHeight);
    })

    console.log(ht,`${ht-82}px`)



    useEffect(()=>{
        getUsersfn();
    },[])

    useEffect(()=>{
        // console.log("person:\n",person)
    },[person])

    const handleSendfn = () => {
        console.log(message);
        const msg = {
            msg : message,
            sender : "1"
        }
        setChats(pre=>{
            return [...pre,msg]
        })
        setMessage("")
    }

       // get all users in contact ****************************************************
       const getUsersfn = async() => {
        // https://campas-connect-chat-wkgk.onrender.com/user/
        await axios.get(`https://campas-connect-chat-wkgk.onrender.com/user`)
        .then(res=>console.log("jjjjjjjjjj::",res))
        console.log("userName  :",userData);
        setUsers(AllUsers);
    }

    // get Messages******************************************************************
    const getChatsfn = ({name}) => {
        // https://campas-connect-chat-wkgk.onrender.com/message/${chatId}
        console.log("get messages request:",name)
        setChats(AllChats);
    }

    // show user self Profile*********************************************************
    const showProfilefn = ({name}) => {
        console.log("Show the Profile ")
    }

    // show Othe person Individual Profile**********************************************
    const showChatterProfile =(person) => {
        const { img ,name ,lastMsg ,lastMessageTime} = person;
        console.log("Show Chatter Profile ",name)
    }

    return <SimpleGrid>
        {/* <Box>
            <Box bg='#86D0C6' >#86D0C6</Box>
            <Box bg='#C7E4D9' >#C7E4D9</Box>
            <Box bg='#95DAEE' >#95DAEE</Box>
            <Box bg='#6ACDE5' >#6ACDE5</Box>
        </Box> */}
        <SimpleGrid mt='79px' bg='blue.100' p='10px' boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px" gridTemplateColumns={menu ? "1fr" :'repeat(2,1fr)'} >
            <SearchBar alignSelf={"center"} users={users} getChatsfn={getChatsfn} setPerson={setPerson} setBack={setBack} />
            <a href="/profile" style={{justifySelf:'flex-end', mr:'15px' }} onClick={showProfilefn}  ><Image src={logo} alt = 'logo' borderRadius='full' boxSize='40px'/></a>
        </SimpleGrid>
        <SimpleGrid h={`${ht-245}px`} display='grid' gridTemplateColumns={menu ? "100%" : "320px 1fr"}>

            { 
            ((!menu) || back) ? 
                <SimpleGrid bg='#eef5ff' >
                <SimpleGrid  p='10px' boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px" display='inline-block' >
                {

// ***********************************************************************************************
                    users.map((el,i)=>{
                        return <SimpleGrid 
                        onClick={()=>{
                            setPerson(el);
                            getChatsfn(el);
                            setBack(false);
                        }} 
                        display="flex" 
                        key={i} 
                        justifyContent='space-between'
                        p='10px'
                        >
                            <Box display="flex" gap='10px' textAlign='left' >
                                <Image
                                    borderRadius='full'
                                    boxSize='50px'
                                    src={el.img}
                                    alt='Image'
                                />
                                <Box>
                                    <Heading as='h4' size='md'>{el.name}</Heading>
                                    <Text fontSize='md'>{el.lastMsg}</Text>
                                </Box>
                            </Box>
                            <Box>
                                {el.lastMessageTime}
                            </Box>
                        </SimpleGrid>
                    })
                }
                </SimpleGrid>
                <Group users={users} />
            </SimpleGrid> 
            : null
            }

            {
            ((!menu) || (!back)) ?
                <SimpleGrid bg='#90faae'  p='10px' boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px" display="inline-block" >
                <SimpleGrid>
                <SimpleGrid display={menu?"grid" : "flex"} justifyContent={menu?"" : 'space-between'} >
                            <SimpleGrid display='flex' gap='20px'>
                                {menu ? <Box onClick={(e)=>setBack(true)}><ArrowBackIcon/></Box> : null}
                                <Image
                                    borderRadius='full'
                                    boxSize='50px'
                                    src={person.img}
                                    alt='Image'
                                />
                                <Box>
                                    <Heading as='h4' size='md'>{person.name}</Heading>
                                    <Text fontSize='md'>last seen {}</Text>
                                </Box>
                            </SimpleGrid>
                            <Box display='flex' justifyContent="end" p='10px'>
                            <Box display='flex'>
                                    <Input bg='white' w='100px' placeholder='Bg Image url' value={backImgUrl} onChange={(e)=>{
                                        setBackImgUrl(e.target.value)
                                    }} />
                                    <Button mr='20px' bg='blue.500' _hover={{ bg : 'white', color : 'blue.500' }} color='white' w='80px' onClick={()=>{
                                        if(backImgUrl){
                                            setBackgroundImg(backImgUrl);
                                        }
                                        setBackImgUrl("");
                                    }} >Add</Button>
                                </Box>
                                <Button onClick={()=>showChatterProfile(person)} ><HamburgerIcon/></Button>
                            </Box>
                        </SimpleGrid>
                </SimpleGrid>
                <SimpleGrid h={`${ht-358}px`} overflow='scroll' backgroundImage={backgroundImg} >
                    {

// ***********************************************************************************************************
                        chats.map((el,i)=>{
                            return <SimpleGrid key={i} justifyContent={(el.sender==='2')? "start" : "end"} p='10px' >
                                <Box display='inline-block'>
                                    <Text  bg={(el.sender==='2')? "#6ACDE5" : "green.300"} p='5px' border={'1px solid blue'} borderRadius='10px' display='inline-block' >{el.msg}</Text>
                                </Box>
                            </SimpleGrid>
                        })
                    }
                </SimpleGrid>
                <SimpleGrid m='auto'  bg='white'>
                    <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        placeholder='Type a message'
                        value={message}
                        onChange={(e)=>{
                            setMessage(e.target.value)
                        }}
                        onKeyPress = {(e)=>{
                            if(e.key==='Enter'){
                                handleSendfn()
                            }
                        }}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem'  _hover={{ bg : 'blue.200', color : 'blue' }}  size='sm' bg='blue.500' color='white'  onClick={handleSendfn}>send</Button>
                    </InputRightElement>
                    </InputGroup>
                </SimpleGrid>
            </SimpleGrid>
            : null
            }

        </SimpleGrid>
    </SimpleGrid>
}



// https://campas-connect-chat-wkgk.onrender.com/

//                    /user
//                    /chats
//                    /message
// /register