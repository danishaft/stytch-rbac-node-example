'use client'
import { InboxBody, InboxHead } from "@/components/custom/inbox";
import { PageBody, PageHead, PageWrapper } from "@/components/wrappers";
import { AppStores } from "@/lib/zustand";


export default function InboxPage() {
  const userStore = AppStores.useUserStore((state) => state.userInfo)
  console.log(userStore)

    return(
      <PageWrapper>
        <PageHead name="Inbox">
          <InboxHead />
        </PageHead>
        <PageBody>
          <InboxBody />
        </PageBody>
      </PageWrapper>
    )
}