import { InboxBody, InboxHead } from "@/components/custom/inbox";
import { PageBody, PageHead, PageWrapper } from "@/components/wrappers";


export default function InboxPage() {
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