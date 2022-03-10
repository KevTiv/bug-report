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
    currUserMetadata? :userMetadataType
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
    url? : string,
}