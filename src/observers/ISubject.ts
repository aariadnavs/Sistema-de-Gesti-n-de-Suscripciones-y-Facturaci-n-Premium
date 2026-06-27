import { IObserver } from './IObserver';

export interface ISubject<T> {
  subscribe(observer: IObserver<T>): void;
  unsubscribe(observer: IObserver<T>): void;
  notifyAll(data: T): void;
}