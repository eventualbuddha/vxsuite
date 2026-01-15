import {
  CardlessVoterUser,
  ElectionManagerUser,
  PollWorkerUser,
  SystemAdministratorUser,
  UserWithCard,
  VendorUser,
} from './auth';

export interface LoggedOut {
status: 'logged_out';
reason:
    | 'card_error'
    | 'certificate_expired'
    | 'certificate_not_yet_valid'
    | 'unprogrammed_or_invalid_card'
    | 'machine_not_configured'
    | 'no_card_reader'
    | 'no_card'
    | 'session_expired'
    | 'vx_poll_book_card_not_allowed'
    | 'wrong_election'
    | 'wrong_jurisdiction';
cardJurisdiction?: string;
cardUserRole?: UserWithCard['role'];
machineJurisdiction?: string;
}

export interface CheckingPin {
status: 'checking_pin';
user:
    | VendorUser
    | SystemAdministratorUser
    | ElectionManagerUser
    | PollWorkerUser;
error?: true;
lockedOutUntil?: Date;
wrongPinEnteredAt?: Date;
}

export interface VendorLoggedIn {
status: 'logged_in';
user: VendorUser;
sessionExpiresAt: Date;
}

export interface SystemAdministratorLoggedIn {
status: 'logged_in';
user: SystemAdministratorUser;
sessionExpiresAt: Date;
}

export interface ElectionManagerLoggedIn {
status: 'logged_in';
user: ElectionManagerUser;
sessionExpiresAt: Date;
}

export interface PollWorkerLoggedIn {
status: 'logged_in';
user: PollWorkerUser;
sessionExpiresAt: Date;
cardlessVoterUser?: CardlessVoterUser;
}

export interface CardlessVoterLoggedIn {
status: 'logged_in';
user: CardlessVoterUser;
sessionExpiresAt: Date;
}

export type LoggedIn =
  | VendorLoggedIn
  | SystemAdministratorLoggedIn
  | ElectionManagerLoggedIn
  | PollWorkerLoggedIn
  | CardlessVoterLoggedIn;

export type AuthStatus = LoggedOut | CheckingPin | LoggedIn;

export const DEFAULT_AUTH_STATUS: Readonly<AuthStatus> = {
  status: 'logged_out',
  reason: 'no_card',
};
