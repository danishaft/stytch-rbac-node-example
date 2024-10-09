import { useStytchB2BClient } from '@stytch/nextjs/b2b';
import {Member} from '@stytch/vanilla-js';


export const useMemberServices = () => {
  const stytch = useStytchB2BClient()
  const invite = async (email: string) => {
    return stytch.magicLinks.email.invite({
      email_address: email,
    });
  };

  const getRole = (member: Member) => {
    const roleIDs = member.roles?.map((role) => role.role_id) || [];
    return getRoleFromList(roleIDs);
  };
  
  const getRoleFromList = (roles: string[]) => {
    if (roles.includes('stytch_admin')) {
      return 'admin';
    } else if (roles.includes('guest')) {
      return 'guest';
    }else if (roles.includes('manager')){
      return 'manager'
    }else {
      return 'member';
    }
  };

  return {
    invite,
    getRole,
  };

}