import {
  DEFAULT_FAMOUS_NAMES_BALLOT_STYLE_ID,
  DEFAULT_FAMOUS_NAMES_PRECINCT_ID,
  DEFAULT_FAMOUS_NAMES_VOTES,
  renderBmdBallotFixture,
} from '@votingworks/bmd-ballot-fixtures';
import { vxFamousNamesFixtures } from '@votingworks/hmpb';
import { pdfToSheetImageFiles } from '@votingworks/image-utils';
import { ElectionDefinition, SheetOf, asSheet } from '@votingworks/types';
import * as fs from 'node:fs/promises';

export async function generateBmdBallotFixture(): Promise<{
  electionDefinition: ElectionDefinition;
  sheet: SheetOf<string>;
}> {
  const { electionDefinition } = vxFamousNamesFixtures;
  const pdfData = await renderBmdBallotFixture({
    electionDefinition,
    ballotStyleId: DEFAULT_FAMOUS_NAMES_BALLOT_STYLE_ID,
    precinctId: DEFAULT_FAMOUS_NAMES_PRECINCT_ID,
    votes: DEFAULT_FAMOUS_NAMES_VOTES,
  });
  return {
    electionDefinition,
    sheet: asSheet(await pdfToSheetImageFiles(pdfData)),
  };
}

export async function generateHmpbFixture(): Promise<{
  electionDefinition: ElectionDefinition;
  sheet: SheetOf<string>;
}> {
  const pdfData = Uint8Array.from(
    await fs.readFile(vxFamousNamesFixtures.markedBallotPath)
  );
  return {
    electionDefinition: vxFamousNamesFixtures.electionDefinition,
    sheet: asSheet(await pdfToSheetImageFiles(pdfData)),
  };
}
