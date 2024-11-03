import { PartialType } from '@nestjs/mapped-types';
import { Favorites } from '../entities/favorites.entity';

export class UpdateFavsDto extends PartialType(Favorites) {}
