import { useStytchB2BClient } from '@stytch/nextjs/b2b';


export const useMemberServices = () => {
  const stytch = useStytchB2BClient()
  const invite = async (email: string) => {
    return stytch.magicLinks.email.invite({
      email_address: email,
    });
  };

  return {
    invite,
  };

}