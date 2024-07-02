import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Project } from "../entities/Project";
import { Category } from "../entities/Category";
import { Attribute, AttributeType } from "../entities/Attribute";
import { Item } from "../entities/Item";
import { ItemAttribute } from "../entities/ItemAttribute";

async function seed() {
  await AppDataSource.initialize();
  const userRepository = AppDataSource.getRepository(User);
  const projectRepository = AppDataSource.getRepository(Project);
  const categoryRepository = AppDataSource.getRepository(Category);
  const attributeRepository = AppDataSource.getRepository(Attribute);
  const itemRepository = AppDataSource.getRepository(Item);
  const itemAttributeRepository = AppDataSource.getRepository(ItemAttribute);

  // Create a user
  const user = new User();
  user.username = "testuser";
  user.password = "password";
  user.email = "testuser@example.com";
  await userRepository.save(user);

  // Create a project
  const project = new Project();
  project.title = "Development Project";
  project.description = "This is a development project.";
  project.user = user;
  await projectRepository.save(project);

  // Retrieve default categories
  const characterCategory = await categoryRepository.findOneBy({
    name: "Character",
  });
  const placeCategory = await categoryRepository.findOneBy({ name: "Place" });
  const eventCategory = await categoryRepository.findOneBy({ name: "Event" });

  // Create items for each category
  const character = new Item();
  character.name = "Dev Character";
  character.category = characterCategory!;
  await itemRepository.save(character);

  const place = new Item();
  place.name = "Dev Place";
  place.category = placeCategory!;
  await itemRepository.save(place);

  const event = new Item();
  event.name = "Dev Event";
  event.category = eventCategory!;
  await itemRepository.save(event);

  // Helper function to handle nullable attributes and type validation
  async function createItemAttribute(
    item: Item,
    attributeName: string,
    value: any
  ) {
    const attribute = await attributeRepository.findOneBy({
      name: attributeName,
    });
    if (attribute) {
      const itemAttribute = new ItemAttribute();
      itemAttribute.item = item;
      itemAttribute.attribute = attribute;

      // Assign value to the appropriate column based on attribute type
      switch (attribute.type) {
        case AttributeType.STRING:
        case AttributeType.TEXT:
          itemAttribute.stringValue = value;
          break;
        case AttributeType.NUMBER:
          itemAttribute.numberValue = value;
          break;
        case AttributeType.BOOLEAN:
          itemAttribute.booleanValue = value;
          break;
        case AttributeType.DATE:
        case AttributeType.DATETIME:
          itemAttribute.dateValue = new Date(value);
          break;
        default:
          // Handle unexpected types or throw an error
          throw new Error(`Unexpected attribute type: ${attribute.type}`);
      }

      await itemAttributeRepository.save(itemAttribute);
    }
  }

  // Create item attributes for the character
  await createItemAttribute(character, "Age", 25); // Stored as number
  await createItemAttribute(character, "DOB", "1996-01-01"); // Stored as date
  await createItemAttribute(
    character,
    "Description",
    "This is a development character."
  ); // Stored as string

  // Create item attributes for the place
  await createItemAttribute(place, "Location", "Dev Location"); // Stored as string
  await createItemAttribute(
    place,
    "Description",
    "This is a development place."
  ); // Stored as string

  // Create item attributes for the event
  await createItemAttribute(event, "Location", "Dev Location"); // Stored as string
  await createItemAttribute(event, "Time", "2023-11-01 10:00:00"); // Stored as date
  await createItemAttribute(
    event,
    "Description",
    "This is a development event."
  ); // Stored as string

  console.log("Development data has been seeded.");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error seeding data:", error);
    process.exit(1);
  });
