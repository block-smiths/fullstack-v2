import { EAS } from '@ethereum-attestation-service/eas-sdk'

export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";

const eas = new EAS(EASContractAddress)

export default eas;
