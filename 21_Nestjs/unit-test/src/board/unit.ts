import { Repository } from 'typeorm';
import { PostRepository } from './repository/post.repository';

export const makeMockObject = <T>(cls: { new (...args: any[]) }): T => {
  const propertyNames = getAllProperties(cls);
  const mockObject: { [field: string]: any } = {};
  for (const pName of propertyNames) {
    mockObject[pName] = jest.fn();
  }
  return mockObject as T;
};

export type MockObjectType<T> = Partial<Record<keyof T, jest.Mock>>;

const getAllProperties = (a: { new (...args: any[]) }, depth = 5): string[] => {
  if (!a.prototype) {
    return [];
  }
  const resultSet: Set<string> = new Set();
  Object.getOwnPropertyNames(a.prototype).forEach((v) => resultSet.add(v));

  if (Object.getPrototypeOf(a).constructor !== Object && depth-- > 0) {
    getAllProperties(Object.getPrototypeOf(a), depth).forEach((v) =>
      resultSet.add(v),
    );
  }

  return [...resultSet];
};

class A {
  public af() {
    return null;
  }
}

class B extends A {
  public bf() {
    return null;
  }
}

class C extends B {
  public cf() {
    return null;
  }
}

// console.log(getAllProperties(PostRepository));
// console.log(getAllProperties(Repository));
// console.log(getAllProperties(C));
