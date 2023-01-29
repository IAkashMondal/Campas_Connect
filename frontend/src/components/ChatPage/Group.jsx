import { AlertDialog, AlertDialogBody, AlertDialogContent,
   AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
   Button, SimpleGrid, useDisclosure,
   Image,Modal,ModalOverlay,ModalContent,ModalHeader,
   ModalCloseButton,ModalBody,ModalFooter,
   Input,
   useToast,
   } from "@chakra-ui/react"
import { useState } from "react";
import { useRef } from "react"

export const Group = ({users}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const toast = useToast()

    const [gc,setGc] = useState({
      name : '',
      members : []
    })
  
    // creating Group
    const createGroupFn = () => {
        console.log(gc)
        if(gc.name=='' || gc.members.length <= 0){
          console.log("error")
          toast({
            title: 'Error',
            status: 'error',
            isClosable: true,
          })
        }else{
          toast({
            title: 'Group created.',
            status: 'success',
            isClosable: true,
          })
        }
    }



  return (
    <>
           <Button
                    size='md'
                    height='48px'
                    width='300px'
                    border='2px'
                    borderColor='green.500'
                    m='auto'
                    mb='10px'
                    onClick={()=>{
                        onOpen();
                    }}
                    >
                        Create Group +
                </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Input placeholder='Enter the name' value={gc.name} onChange={(e)=>{
            setGc(pre=>{
              return {...pre,name:e.target.value}
            });
          }} />
            {
                  users.map((el,i)=>{
                    return <SimpleGrid  key={i} display="flex" 
                        onClick={(e)=>{
                          let arr = gc.members;
                          arr.push(el.name)
                          e.target.style.backgroundColor = "#88c288"
                          setGc(pre=>{
                            return {...pre,members:arr}
                          })
                      }}
                    >
                       <Image
                            boxSize='2rem'
                            borderRadius='full'
                            src={el.img}
                            alt={el.name}
                            mr='12px'
                            />
                            <span>{el.name}</span>
                    </SimpleGrid>
                  })
                }
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={(e)=>{
              createGroupFn();
              onClose();
            }}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )

    // return (
    //   <>
    //     <Button
    //                 size='md'
    //                 height='48px'
    //                 width='300px'
    //                 border='2px'
    //                 borderColor='green.500'
    //                 m='auto'
    //                 mb='10px'
    //                 onClick={()=>{
    //                     createGroupFn();
    //                     onOpen()
    //                 }}
    //                 >
    //                     Create Group +
    //             </Button>
  
    //     <AlertDialog
    //       isOpen={isOpen}
    //       leastDestructiveRef={cancelRef}
    //       onClose={onClose}
    //     >
    //       <AlertDialogOverlay>
    //         <AlertDialogContent>
    //           <AlertDialogHeader fontSize='lg' fontWeight='bold'>
    //             Delete Customer
    //           </AlertDialogHeader>
  
    //           <AlertDialogBody>
    //             {
    //               users.map((el,i)=>{
    //                 return <SimpleGrid key={i} display="flex" 
    //                     onClick={(e)=>{
    //                       setGc(pre=>{
    //                         return {...pre,members:pre.members.push(el.name)}
    //                       })
    //                   }}
    //                 >
    //                    <Image
    //                         boxSize='2rem'
    //                         borderRadius='full'
    //                         src={el.img}
    //                         alt={el.name}
    //                         mr='12px'
    //                         />
    //                         <span>{el.name}</span>
    //                 </SimpleGrid>
    //               })
    //             }
    //           </AlertDialogBody>
  
    //           <AlertDialogFooter>
    //             <Button ref={cancelRef} onClick={onClose}>
    //               Cancel
    //             </Button>
    //             <Button colorScheme='red' onClick={onClose} ml={3}>
    //               Delete
    //             </Button>
    //           </AlertDialogFooter>
    //         </AlertDialogContent>
    //       </AlertDialogOverlay>
    //     </AlertDialog>
    //   </>
    // )
}