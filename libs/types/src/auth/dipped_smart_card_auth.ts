import {
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
    | 'machine_locked_by_session_expiry'
    | 'machine_locked'
    | 'machine_not_configured'
    | 'no_card_reader'
    | 'user_role_not_allowed'
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
error?: { error: unknown; erroredAt: Date };
lockedOutUntil?: Date;
wrongPinEnteredAt?: Date;
}

export interface RemoveCard {
status: 'remove_card';
user:
    | VendorUser
    | SystemAdministratorUser
    | ElectionManagerUser
    | PollWorkerUser;
sessionExpiresAt: Date;
}

export interface ProgrammableCardReady {
  status: 'ready';
  programmedUser?: UserWithCard;
}

interface ProgrammableCardNotReady {
  status: 'card_error' | 'no_card_reader' | 'no_card' | 'unknown_error';
}

export type ProgrammableCard = ProgrammableCardReady | ProgrammableCardNotReady;

export interface VendorLoggedIn {
status: 'logged_in';
user: VendorUser;
sessionExpiresAt: Date;
}

export interface SystemAdministratorLoggedIn {
status: 'logged_in';
user: SystemAdministratorUser;
sessionExpiresAt: Date;
programmableCard: ProgrammableCard;
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
}

export type LoggedIn =
  | VendorLoggedIn
  | SystemAdministratorLoggedIn
  | ElectionManagerLoggedIn
  | PollWorkerLoggedIn;

export type AuthStatus = LoggedOut | CheckingPin | RemoveCard | LoggedIn;

export const DEFAULT_AUTH_STATUS: Readonly<AuthStatus> = {
  status: 'logged_out',
  reason: 'machine_locked',
};
