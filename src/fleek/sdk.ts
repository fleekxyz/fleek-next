import { FleekSdk, PersonalAccessTokenService } from '@fleekxyz/sdk';
import { getPersonalAccessTokenOrPrompt } from '../commands/build/prompts/getPersonalAccessTokenOrPrompt.js';
import { getProjectIdOrPrompt } from '../commands/build/prompts/getProjectIdOrPrompt.js';
import { MissingPersonalAccessTokenError } from '../errors/MissingPersonalAccessTokenError.js';
import { MissingProjectIdError } from '../errors/MissingProjectIdError.js';

type projectPath = {
  path?: string;
};

export async function getSdkClient({ path }: projectPath): Promise<FleekSdk> {
  const personalAccessToken = await getPersonalAccessTokenOrPrompt();

  if (!personalAccessToken) {
    throw new MissingPersonalAccessTokenError();
  }

  const projectId = await getProjectIdOrPrompt({ path: path });

  if (!projectId) {
    throw new MissingProjectIdError();
  }

  const accessTokenService = new PersonalAccessTokenService({ projectId, personalAccessToken });
  const sdk = new FleekSdk({ accessTokenService });

  return sdk;
}
