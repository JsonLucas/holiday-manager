import { Flex, VStack, Input, Button, Text, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from "react-loader-spinner";
import { updatePasswordRequest, verificateEmailRequest } from "../../api/user";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { SEOHelper } from "../../components/SEOHelper";
import { Header } from "../../components/Header";
import { useToast } from "../../hooks/useToast";
import { useForm } from "react-hook-form";
import { FaArrowCircleLeft } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { joiResolver } from "@hookform/resolvers/joi";
import { emailVerificationSchema, updatePasswordSchema } from "../../utilities/schemas";
import { ErrorLabel } from "../../components/ErrorLabel";

interface Fields {
    email: string,
    password: string,
    confirmPassword: string
}

type EmailVerification = Pick<Fields, 'email'>;
type UpdatePassword = Omit<Fields, 'email'>;

export function ForgotPassword() {
    const {
        register: registerEmailVerification,
        handleSubmit: handleSubmitEmailVerification,
        formState: {
            errors: errorsEmailVerification,
            isSubmitting: isSubmittingEmailVerification
        },
        getValues
    } = useForm<EmailVerification>({ resolver: zodResolver(emailVerificationSchema) });

    const {
        register: registerUpdatePassword,
        handleSubmit: handleSubmitUpdatePassword,
        formState: {
            errors: errorsUpdatePassword,
            isSubmitting: isSubmittingUpdatePassword
        }
    } = useForm<UpdatePassword>({ resolver: joiResolver(updatePasswordSchema)});

    const [nextStep, setNextStep] = useState(false);
    const { colorMode } = useColorMode();
    const { get } = useLocalStorage();
    const { genericToast } = useToast();
    const navigate = useNavigate();

    const verificateEmail = async (data: any) => {
        try {
            await verificateEmailRequest(data.email);
            setNextStep(true);
        } catch (e: any) {
            console.log(e);
            if (e.response) {
                genericToast({
                    title: 'Error',
                    description: e.response.data.message ?? "Invalid email",
                    status: 'error'
                });
            }
        }
    }

    const updatePassword = async (data: any) => {
        try {
            await updatePasswordRequest(getValues().email, data.password);
            genericToast({
                title: 'Updated Password',
                description: "Yay! Successfuly updated your password.",
                status: 'success'
            });
            navigate('/');
        } catch (e: any) {
            console.log(e);
            if (e.response) {
                genericToast({
                    title: 'Error',
                    description: e.response.data.message ?? "Invalid email",
                    status: 'error'
                });
            }
        }
    }

    useEffect(() => {
        if (get("accessToken")) navigate('/home');
    }, []);

    return (
        <>
            <SEOHelper title="Login" content="Holiday Manager password recovery page." href={window.location.pathname} />
            <Flex w="100vw" h="100vh" justifyContent="center" alignItems='center'>
                <Header />
                {!nextStep &&
                    <VStack
                        h='40%'
                        w={['95%', '75%', '55%', '35%']}
                        justifyContent='center'
                        p="20px"
                        borderRadius={10}
                    >
                        <Flex w='100%' mb='20px' cursor='pointer' onClick={() => navigate("/")}>
                            <FaArrowCircleLeft size={25} />
                            <Text ml='5px'>Back to Login</Text>
                        </Flex>
                        <VStack w='100%'>
                            <Input
                                {...registerEmailVerification("email", { required: "Email is required." })}
                                type="email"
                                bgColor='white'
                                color='black'
                                placeholder='Email'
                                data-test="email-input-forgot-password"
                                {...colorMode === "dark" ? undefined : { borderWidth: '1px', borderColor: '#aaa' }}
                            />
                            {errorsEmailVerification.email && <ErrorLabel error={errorsEmailVerification.email.message} />}
                        </VStack>
                        <Button data-test="button-verificate-email" w='150px' _hover={{ color: '#444', bgColor: 'lightgreen' }} mt='20px' mx='auto' bgColor="darkgreen" color='white' onClick={handleSubmitEmailVerification(verificateEmail)} disabled={isSubmittingEmailVerification}>
                            {!isSubmittingEmailVerification && <>Send</>}
                            {isSubmittingEmailVerification && <ThreeDots color="white" />}
                        </Button>
                    </VStack>
                }
                {nextStep &&
                    <VStack
                        h='40%'
                        w={['95%', '75%', '55%', '35%']}
                        justifyContent='center'
                        p="20px"
                        borderRadius={10}
                    >
                        <Flex w='100%' mb='20px' cursor='pointer' onClick={() => navigate("/")}>
                            <FaArrowCircleLeft size={25} />
                            <Text ml='5px'>Back to Login</Text>
                        </Flex>
                        <VStack w='100%'>
                            <Input
                                {...registerUpdatePassword("password", { required: "Password is required." })}
                                type="password"
                                bgColor='white'
                                color='black'
                                placeholder='New Password'
                                data-test="password-input-forgot-password"
                                {...colorMode === "dark" ? undefined : { borderWidth: '1px', borderColor: '#aaa' }}
                            />
                            {errorsUpdatePassword.password && <ErrorLabel error={errorsUpdatePassword.password.message} />}
                            <Input
                                {...registerUpdatePassword("confirmPassword", { required: "You must to confirm your password" })}
                                type="password"
                                bgColor='white'
                                color='black'
                                placeholder='Confirm Password'
                                data-test="confirm-password-input-forgot-password"
                                {...colorMode === "dark" ? undefined : { borderWidth: '1px', borderColor: '#aaa' }}
                            />
                            {errorsUpdatePassword.confirmPassword && <ErrorLabel error={errorsUpdatePassword.confirmPassword.message} />}
                        </VStack>
                        <Button data-test="button-recovery-password" w='150px' _hover={{ color: '#444', bgColor: 'lightgreen' }} mt='20px' mx='auto' bgColor="darkgreen" color='white' onClick={handleSubmitUpdatePassword(updatePassword)} disabled={isSubmittingUpdatePassword}>
                            {!isSubmittingUpdatePassword && <>Recovery Password</>}
                            {isSubmittingUpdatePassword && <ThreeDots color="white" />}
                        </Button>
                    </VStack>
                }
            </Flex>
        </>
    );
}