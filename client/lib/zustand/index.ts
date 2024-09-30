import { useDepartmentStore } from "./department";
import { useOrgStore } from "./organization";
import { useUserStore } from "./user";
import {useProjectStore} from "./project"


export const AppStores = {
    useUserStore,
    useOrgStore,
    useDepartmentStore,
    useProjectStore
}