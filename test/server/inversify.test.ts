import 'reflect-metadata';
import { injectable, Container } from 'inversify';

@injectable()
class Katana {
    shapness = 'pupple';

    public hit() {
        return 'cut!';
    }
}

@injectable()
class Ninja implements Ninja {
    public katana: Katana;
    public constructor(katana: Katana) {
        this.katana = katana;
    }
    public fight() {
        return this.katana.hit();
    }
}

let container = new Container();

afterEach(() => {
    container = new Container();
});

describe('Inversify bind', () => {
    it('bind value with name', () => {
        container.bind('Katana').toConstantValue(new Katana());
        const katana = container.get<Katana>('Katana');
        expect(katana.shapness).toEqual('pupple');
    }, 10000);

    it('bind function which return value with name ', () => {
        container.bind('DynamicKatana').toDynamicValue(() => new Katana());
        const katana = container.get<Katana>('DynamicKatana');
        expect(katana.shapness).toEqual('pupple');
    });
});

describe('Inversify resolve', () => {
    it('resolve root class without bind', () => {
        container.bind(Katana).toSelf();
        const ninja = container.resolve(Ninja);
        expect(ninja.fight()).toEqual('cut!');
    }, 10000);

    it('fail to resolve sub dependencies automatically', () => {
        //Ninja has been registered, but need to bind Katana too.
        container.bind(Ninja).toSelf();
        const tryGet = () => container.get(Ninja);
        expect(tryGet).toThrow(
            'No matching bindings found for serviceIdentifier: Katana'
        );
    });
});
