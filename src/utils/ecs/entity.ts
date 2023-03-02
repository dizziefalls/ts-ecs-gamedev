import { IUpdate } from "../update.h";
import { IComponent } from "./component.h";

type constr<T> = { new(...args: unknown[]): T }

export abstract class Entity implements IUpdate {
  //create a list of the components on this entity
  protected _components: IComponent[] = []

  public get Components(): IComponent[] {
    return this._components
  }

  public AddComponent(component: IComponent): void {
    this._components.push(component)
    component.Entity = this
  }

  //when getting our component we want to return reference to it by its type. We create a generic to maps our interface IComponent to a Class C, construct it with any number of args, and make sure what's constructed and returned conforms to our type C. This allows us to search by type rather than instance.
  public GetComponent<C extends IComponent>(constr: constr<C>): C {
    for (const component of this._components) {
      if (component instanceof constr) {
        return component as C
      }
    }
    throw new Error(`Component ${constr.name} not found on Entity ${this.constructor.name}`)
  }

  //This one gets funky. Create a new type of the inputted component. Then we will traverse our array to find its index if it exists to remove it using splice. We don't want the component to be associated with the entity any longer, so we set it's entity to null.
  public RemoveComponent<C extends IComponent>(constr: constr<C>): void {
    let toRemove: IComponent | undefined
    let index: number | undefined

    for (let i = 0; i < this._components.length; i++) {
      const component = this._components[i]
      if (component instanceof constr) {
        toRemove = component
        index = i
        break
      }
    }

    if (toRemove && index) {
      toRemove.Entity = null
      this._components.splice(index, 1)
    }
  }

  //return a boolean for if there's such a component on this class without returning the component type
  public HasComponent<C extends IComponent>(constr: constr<C>): boolean {
    for (const component of this._components) {
      if (component instanceof constr) {
        return true
      }
    }

    return false
  }

  //Add our tick interface
  public Update(deltaTime: number): void {
    for(const component of this._components) {
      component.Update(deltaTime)
    }
  }
}