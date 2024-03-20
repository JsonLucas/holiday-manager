import { Flex, VStack, Input, Button, Text, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ThreeDots } from "react-loader-spinner";
import { loginRequest } from "../../api/user";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { SEOHelper } from "../../components/SEOHelper";
import { IoIosAt, IoIosLock } from "react-icons/io";
import { Header } from "../../components/Header";
import { useToast } from "../../hooks/useToast";

type Fields = {
	email: string,
	password: string,
};

export function Login() {
	const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<Fields>();
	const { add, get } = useLocalStorage();
	const { genericToast } = useToast();
	const navigate = useNavigate();

	const login = async (data: any) => {
		try {
			const response = await loginRequest(data);
			genericToast({
				title: "Successfuly logged in.",
				description: "Welcome to the HolidayManager!",
				status: "success"
			});
			add("accessToken", response.token);
			navigate("/home");
		} catch (e: any) {
			console.log(e);
			genericToast({
				title: "Error",
				description: e.response.data.message ?? e.message,
				status: "error"
			});
			setError("password", { message: "Invalid email or password, try again." })
		}
	}

	useEffect(() => {
		if (get("accessToken")) navigate('/home');
		else navigate('/');
	}, []);

	return (
		<>
			<SEOHelper title="Login" content="Holiday Manager login page." href={window.location.pathname} />
			<Flex w="100vw" h="100vh" justifyContent="center" alignItems='center'>
				<Header />
				<VStack 
					h='40%' 
					w={['95%', '75%', '55%', '35%']} 
					justifyContent='center' 
					p="20px" 
					bgColor='#eef' 
					boxShadow="0px 0px 10px 1px rgba(0,0,0,0.5)" 
					borderRadius={10}
				>
					<VStack w='100%'>
						<InputGroup>
							<InputLeftElement pointerEvents='none'>
								<IoIosAt size={25} color='black' />
							</InputLeftElement>
							<Input 
								{...register('email', { required: "Enter with your email." })} 
								variant="flushed" 
								type='email' 
								placeholder="Email" 
								color='black'
							/>
						</InputGroup>
						{errors.email && <Text w='100%' textAlign='left' color='darkred'>{errors.email.message}</Text>}
						<InputGroup>
							<InputLeftElement pointerEvents='none'>
								<IoIosLock size={25} color='black' />
							</InputLeftElement>
							<Input {
								...register('password', { required: "Enter with your password." })} 
								variant="flushed" 
								type='password' 
								placeholder="Password" 
								color='black'
							/>
						</InputGroup>
						{errors.password && <Text w='100%' textAlign='left' color='darkred'>{errors.password.message}</Text>}
					</VStack>
					<Text 
						w='100%' 
						mt='10px' 
						color='black' 
						fontSize='12.5px' 
						textAlign='right' 
						cursor='pointer'
						onClick={() => navigate("/forgot-password")}
					>
						Forgot your password?
					</Text>
					<Button w='150px' _hover={{ color: 'black', bgColor: 'transparent' }} mt='20px' mx='auto' bgColor="darkgreen" color='white' onClick={handleSubmit(login)} disabled={isSubmitting}>
						{!isSubmitting && <>Login</>}
						{isSubmitting && <ThreeDots color="white" />}
					</Button>
					<Text 
						mt='10px' 
						color='black' 
						textAlign='center' 
						textDecor='underline' 
						cursor='pointer' 
						onClick={() => navigate('/signup')}
					>
						Don't have an account yet? Click here!
					</Text>
				</VStack>
			</Flex>
		</>
	);
}