import { User } from "@supabase/supabase-js"

export type formFieldTypes = {
    isNewBug? : boolean, 
    id? : number,
    title? : string,
    description? : string,
    location? : string,
    processToReplicate? : string,
    priorityStatus? : string,
    author? : string,
    isResolved? : boolean,
    resolvedBy? : string,
    url? : string,
    file? : File,
    currUserMetadata? :userMetadataType
    allUser? : userMetadataType[],
}
export type userMetadataType={
    id? : string,
    email? : string,
    authBy? : string,
    numbOfRaisedBugAllowed? : number,
    allowedToModifyBugReport? : boolean,
    allowedToDeleteBugReport? : boolean,
}
export type bugType={
    id? : number,
    title? : string,
    description? : string,
    location? : string,
    processToReplicate? : string,
    priorityStatus? : string,
    author? : string,
    isResolved? : boolean,
    resolvedBy? : string,
    createdAt? : string,
    updatedAt? : string,
    url? : string,
}
export type buttonType={
    bugId? : number,
    isPrivilege? : boolean
}
export type navType={
    page? : string,
    user: { 
        avatar_url? : string,
        email? : string,
        email_verified?: true,
        iss? : string,
        preferred_username? : string,
        provider_id? : string,
        sub? : string,
        user_name? : string
    }
}
export type errContextType = {
    isError: boolean
}
export type bugCardType = {
    latestResolvedBug? : bugType[],
    latestUnresolvedBug? : bugType[],
}
export type dashboardPropsType={
  user : User,
  latestResolvedBug : string,
  latestUnresolvedBug : string
}
export type historyPagePropsType={
  bugsList : string,
  currUserPrivileges :{
    allowedToModifyBugReport : boolean,
      allowedToDeleteBugReport : boolean
  },
  user : User
}
export type modifyPageProps={
  bugInfo: string,
  allUserList: string,
  currUser: User,
  user: User
}
export type newPageProps={
  user: User,
  currUser: User,
}
export type viewBugPageProps={
  bugInfo: string,
  user: User,
  currUserPrivileges: {
    allowedToDeleteBugReport: boolean,
    allowedToModifyBugReport: boolean,
  },
}