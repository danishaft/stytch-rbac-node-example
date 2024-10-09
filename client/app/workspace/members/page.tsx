'use client'
import { InviteMembers } from '@/components/custom/organization/InviteMembers'
import { Button } from '@/components/ui/button'
import { AppStores } from '@/lib/zustand'
import React, { useEffect } from 'react'
import { IinviteToOrgSchema, inviteToOrgSchema, inviteToOrgValues } from './validations'
import { PageBody, PageHead, PageWrapper } from '@/components/wrappers'
import { MemberCard } from '@/components/custom/organization/memberCard'
import { useMemberServices } from '@/app/utils'
import { useStytchMember } from '@stytch/nextjs/b2b'
// list all members belonging to the workspace

export default function WorkspaceMembers () {
  const {member: stytchMember, isInitialized} = useStytchMember();
  const {invite} = useMemberServices()
  const fetchMembers = AppStores.useOrgStore((state) => state.fetchOrgMembers)
  const addInvitedMember = AppStores.useOrgStore((state) => state.addInvitedMember)
  const membersArray = AppStores.useOrgStore((state) => state.orgMembers)
  const orgStore = AppStores.useOrgStore((state) => state.orgInfo)
  const allDepartments = AppStores.useDepartmentStore((state) => state.departments)
  console.log('member state', membersArray)

  const handleInviteToOrg = async (values: IinviteToOrgSchema) => {
    // invite
    const invitedMember = await invite(values.email)
    console.log('invitedmember', invitedMember)
    addInvitedMember(invitedMember.member, values.departmentId)
  }
  const {getRole} = useMemberServices()

  useEffect(() => {
    fetchMembers()
  }, [])

  return (
    <PageWrapper>
      <div className="border-b-2 py-4">
        <h2 className='capitalize page-text-1 font-bold'>{orgStore.name} Members</h2>
        <p className='page-text-2 text-gray-500'>Manage who is a member of <span className='capitalize text-dark'>{orgStore.name}</span> workspace</p>
      </div>
      <PageHead name='Manage members'>
        <InviteMembers
          departments={allDepartments}
          defaultValues={inviteToOrgValues}
          onSubmit={handleInviteToOrg}
          schema={inviteToOrgSchema}
          isLoading
        />
      </PageHead>
      <PageBody className="flex flex-col gap-3 w-full px-4 py-6">
        {membersArray.map(member => 
            <MemberCard
              id={member.id}
              email={member.email}
              name={member.name}
              role={stytchMember ? getRole(stytchMember) : ''}
              status={member.status}
            />
        )}
      </PageBody>
    </PageWrapper>
  )
}
