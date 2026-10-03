import crypto from "node:crypto";

import env from "../config/env";

type StateRecord = {
  expiresAt: number;
};

const stateStore = new Map<string, StateRecord>();
const STATE_TTL_MS = 10 * 60 * 1000;

function oauth2Configured(): boolean {
  return Boolean(
    env.oauth2ClientId &&
      env.oauth2AuthorizeUrl &&
      env.oauth2TokenUrl &&
      env.oauth2RedirectUri &&
      env.oauth2ClientSecret
  );
}

export function isOAuth2Configured(): boolean {
  return oauth2Configured();
}

function buildAuthorizationUrl(state: string): string {
  const url = new URL(env.oauth2AuthorizeUrl);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", env.oauth2ClientId);
  url.searchParams.set("redirect_uri", env.oauth2RedirectUri);
  url.searchParams.set("scope", env.oauth2Scopes);
  url.searchParams.set("state", state);
  return url.toString();
}

export function startOAuth2Login(): { state: string; authorizationUrl: string } {
  if (!oauth2Configured()) {
    throw new Error("OAuth2 nao configurado. Defina as variaveis OAUTH2_* no .env.");
  }

  const state = crypto.randomBytes(24).toString("hex");
  stateStore.set(state, { expiresAt: Date.now() + STATE_TTL_MS });

  return {
    state,
    authorizationUrl: buildAuthorizationUrl(state)
  };
}

function consumeState(state: string): boolean {
  const data = stateStore.get(state);
  if (!data) return false;

  stateStore.delete(state);
  if (Date.now() > data.expiresAt) return false;

  return true;
}

export async function exchangeCodeForToken(input: {
  code: string;
  state: string;
}): Promise<Record<string, unknown>> {
  if (!oauth2Configured()) {
    throw new Error("OAuth2 nao configurado. Defina as variaveis OAUTH2_* no .env.");
  }

  if (!consumeState(input.state)) {
    throw new Error("State OAuth2 invalido ou expirado.");
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: input.code,
    redirect_uri: env.oauth2RedirectUri,
    client_id: env.oauth2ClientId,
    client_secret: env.oauth2ClientSecret
  });

  const response = await fetch(env.oauth2TokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });

  const data = (await response.json()) as Record<string, unknown>;

  if (!response.ok) {
    throw new Error("Falha na troca do codigo OAuth2 por token.");
  }

  return data;
}
