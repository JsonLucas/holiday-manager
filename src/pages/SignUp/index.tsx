import { Flex, InputGroup, Input, InputLeftElement, Button, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThreeDots } from "react-loader-spinner";
import { signUpSchema } from "../../utilities/schemas";
import { signUpRequest } from "../../api/user";
import { useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { SEOHelper } from "../../components/SEOHelper";
import { IoIosAt, IoIosLock, IoIosPerson } from "react-icons/io";
import { Header } from "../../components/Header";
import { useToast } from "../../hooks/useToast";
import * as z from 'zod';
import { ErrorLabel } from "../../components/ErrorLabel";

type Fields = z.infer<typeof signUpSchema>;

export function SignUp() {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<Fields>({ resolver: zodResolver(signUpSchema) });
    const { get, add } = useLocalStorage();
    const { genericToast } = useToast();
    const navigate = useNavigate();
    const signUp = async (data: any) => {
        try {
            const response = await signUpRequest(data);
            add("accessToken", response.token);
            genericToast({
                title: "Account created.",
                description: "Yay! your account was created!",
                status: "success"
            });
            navigate('/home');
        } catch (e: any) {
            console.log(e);
            if (e.response) {
                const { data } = e.response;
                setError('email', { message: data.message });
                genericToast({
                    title: "Error.",
                    description: data.message,
                    status: "error"
                });
            } else
            genericToast({
                title: "Error.",
                description: "We got touble to create your account.",
                status: "error"
            });
        }
    }

    useEffect(() => {
        if (get("accessToken")) navigate('/home');
    }, []);

    return (
        <>
            <SEOHelper title="SignUp" content="Holiday Manager sign up page." href={window.location.pathname} />
            <Flex w="100vw" h="100vh" justifyContent="center" alignItems='center'>
                <Header />
                <VStack 
					w={['95%', '75%', '55%', '35%']}  
                    p="20px" 
                    borderRadius={10} 
                    bgColor='#eef' 
                    boxShadow="0px 0px 10px 1px rgba(0,0,0,0.5)"
                >
                    <InputGroup display='flex' flexDirection='column'>
                        <InputLeftElement pointerEvents='none'>
                            <IoIosPerson size={25} color='black' />
                        </InputLeftElement>
                        <Input 
                            {...register('name', { required: "Name is required." })} 
                            variant='flushed' 
                            type='text' 
                            placeholder="Name" 
                            color='black'
                            mb='10px' 
                            data-test="name-input-signup"
                        />
                    </InputGroup>
                    {errors.name && <ErrorLabel error={errors.name.message} />}
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <IoIosAt size={25} color='black' />
                        </InputLeftElement>
                        <Input 
                            {...register('email', { required: "Email is required." })} 
                            variant='flushed' 
                            type='email' 
                            placeholder="Email" 
                            color='black'
                            mb='10px' 
                            data-test="email-input-signup"
                        />
                    </InputGroup>
                    {errors.email && <ErrorLabel error={errors.email.message} />}
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <IoIosLock size={25} color='black' />
                        </InputLeftElement>
                        <Input 
                            {...register('password', { required: "You must to setup a password." })} 
                            variant='flushed' 
                            type='password' 
                            placeholder="Password" 
                            color='black'
                            mb='10px' 
                            data-test="password-input-signup"
                        />
                    </InputGroup>
                    {errors.password && <ErrorLabel error={errors.password.message} />}
                    <Button data-test='button-signup' disabled={isSubmitting} w='150px' mx='auto' _hover={{ color: 'black', bgColor: 'transparent' }} bgColor='darkgreen' color='white' onClick={handleSubmit(signUp)}>
                        {!isSubmitting && <>Create Account</>}
                        {isSubmitting && <ThreeDots color="white" />}
                    </Button>
                    <Text textAlign='center' mt='5px' cursor='pointer' color='black' textDecor='underline' onClick={() => navigate('/')}>Back to login</Text>
                </VStack>
            </Flex>
        </>
    );
}