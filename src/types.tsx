import { ReactNode, ReactElement } from 'react';

export type EmbedProps = {
  platforms: PlatformList;
  concurrency?: number;
  preserveOrder?: Boolean;
} & EmbedComponentProps;

export type EmbedComponentProps = { src: string; [key: string]: any };

export type Platform = {
  id: string;

  isPlatform(src: string): boolean | Promise<boolean>;

  EmbedComponent: (props: EmbedComponentProps) => ReactElement | null;
};

export type PlatformList = Platform[];
