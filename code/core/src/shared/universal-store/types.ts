import type { Channel } from '@storybook/core/channels';

import type { UniversalStore } from '.';

export type EnvironmentType =
  (typeof UniversalStore.Environment)[keyof typeof UniversalStore.Environment];

export type StateUpdater<TState> = (prevState: TState) => TState;
export type Actor = {
  id: string;
  type: (typeof UniversalStore.ActorType)[keyof typeof UniversalStore.ActorType];
  environment: EnvironmentType;
};
export type EventInfo = {
  actor: Actor;
  forwardingActor?: Actor;
};

export type Listener<TEvent> = (event: TEvent, eventInfo: EventInfo) => void;

export type BaseEvent = {
  type: string;
  payload?: any;
};

export interface SetStateEvent<TState> extends BaseEvent {
  type: typeof UniversalStore.InternalEventType.SET_STATE;
  payload: {
    state: TState;
    previousState: TState;
  };
}
export interface ExistingStateRequestEvent extends BaseEvent {
  type: typeof UniversalStore.InternalEventType.EXISTING_STATE_REQUEST;
  payload?: undefined;
}
export interface ExistingStateResponseEvent<TState> extends BaseEvent {
  type: typeof UniversalStore.InternalEventType.EXISTING_STATE_RESPONSE;
  payload: TState;
}

export type InternalEvent<TState> =
  | SetStateEvent<TState>
  | ExistingStateRequestEvent
  | ExistingStateResponseEvent<TState>;
export type Event<TState, TEvent extends BaseEvent> = TEvent | InternalEvent<TState>;
export type ChannelEvent<TState, TEvent extends BaseEvent> = {
  event: Event<TState, TEvent>;
  eventInfo: EventInfo;
};

export type ChannelLike = Pick<Channel, 'on' | 'off' | 'emit'>;

export type StoreOptions<TState> = {
  id: string;
  leader?: boolean;
  // TODO: Make leader required when initialState is set
  initialState?: TState;
  debug?: boolean;
};
