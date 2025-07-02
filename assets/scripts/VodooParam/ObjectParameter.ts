// ObjectParameter.ts
import { BaseParameter } from './BaseParameter';

export class ObjectParameter<T extends Record<string, any>> extends BaseParameter {
    parameters: T;
    constructor(label: string, parameters: T, category?: string) {
        super(label, 'object', category);
        this.parameters = parameters;
    }
}