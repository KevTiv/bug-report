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