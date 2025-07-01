import Link from "next/link";
import MinecraftText from "@/components/MinecraftText";
import ArticleLayout from "@/internals/ArticleLayout";
import { Card, CardHeading } from "@/components/Card";

export default function GameplayPage() {
  return (
    <ArticleLayout title="Gameplay">
      <div className="textContent paragraphMargin">
        <p>
          Some stuff on the server functions a little differently from Vanilla.
        </p>

        <p>
          Various <Link href="/wiki/crafting-recipes">crafting recipes</Link>{" "}
          have been added to make things a bit easier.
        </p>
      </div>

      <div className="paragraphMargin textContent">
        <h2>Gamerules</h2>

        <div className="cardGrid">
          <Card>
            <CardHeading>keepInventory</CardHeading>
            <p>true</p>
          </Card>

          <Card>
            <CardHeading>sleepingPercent</CardHeading>
            <p>33</p>
          </Card>

          <Card>
            <CardHeading>doInsomnia</CardHeading>
            <p>false</p>
          </Card>
        </div>
      </div>

      <div className="textContent paragraphMargin">
        <h2>Sleeping</h2>

        <p>
          Only a third of the people online have to sleep for it to turn to day.
        </p>
      </div>

      <div className="textContent paragraphMargin">
        <h2>Nicknames and Colors</h2>

        <p>
          Players can set their own nickname by doing{" "}
          <MinecraftText>/nickname [name]</MinecraftText>. You can use Minecraft
          color codes in your nickname or use custom hex colors by using{" "}
          <MinecraftText>&#&lt;hexcolor&gt;</MinecraftText>.
        </p>

        <p>
          For example, <MinecraftText>/nickname &#ff8408Zyp</MinecraftText>{" "}
          would give you an orange username with the nickname "Zyp". If you'd
          like just the color without a nickname, you can use{" "}
          <MinecraftText>/nickcolor [color_code]</MinecraftText> to set your
          entire username to one color.
        </p>

        <p>
          You can do <MinecraftText>/nonick</MinecraftText> to remove your
          nickname.
        </p>
      </div>

      <div className="textContent paragraphMargin">
        <h2>Mobs</h2>

        <p>
          All mobs have a chance to drop their own head as an item. These
          chances can be increased with the{" "}
          <span className="bold">Looting</span> enchantment.
        </p>

        <p>Shulkers will always drop 2 Shulker Shells.</p>

        <p>You can trade with Wandering Villagers to get Mini Blocks.</p>

        <p>Phantoms will not spawn.</p>
      </div>
    </ArticleLayout>
  );
}
