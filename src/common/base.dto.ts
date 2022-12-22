import { Expose, plainToClass } from 'class-transformer';

export abstract class BaseDto {
    @Expose()
    public id: string | number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    static plainToClass<T>(this: new (...args: any[]) => T, obj: T): T {
        return plainToClass(this, obj, {
            excludeExtraneousValues: true,
        });
    }
}
