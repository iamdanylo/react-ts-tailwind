import { ClassNameValue, twMerge } from 'tailwind-merge';

export function twm(...classLists: ClassNameValue[]) {
  return twMerge(classLists);
}
