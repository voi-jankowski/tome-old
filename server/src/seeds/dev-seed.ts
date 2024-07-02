import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Project } from "../entities/Project";
import { Category } from "../entities/Category";
import { Attribute } from "../entities/Attribute";
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

   // Helper function to handle nullable attributes
    const createItemAttribute = async (
        item: Item,
        attribute: Attribute,
        value: string

  console.log("Development data has been seeded.");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error seeding data:", error);
    process.exit(1);
  });
