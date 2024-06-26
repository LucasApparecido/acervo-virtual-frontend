export class Artifact {
  artifactId!: number;
  artifactNumber!: string;
  artifactName!: string;
  provenance!: string;
  collectorDonor!: string;
  familyTaxon!: string;
  collectionYear!: number;
  locationInCollection!: string;
  periodEpochAge!: string;
  collection!: string;
  artifactDescription!: string;
  status: boolean = false;
  tombingDate!: Date;
  registrationDate!: Date;
}

