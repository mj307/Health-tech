import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerShift = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Shift, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly clinicName: string;
  readonly status: string;
  readonly nurseName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyShift = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Shift, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly clinicName: string;
  readonly status: string;
  readonly nurseName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Shift = LazyLoading extends LazyLoadingDisabled ? EagerShift : LazyShift

export declare const Shift: (new (init: ModelInit<Shift>) => Shift) & {
  copyOf(source: Shift, mutator: (draft: MutableModel<Shift>) => MutableModel<Shift> | void): Shift;
}