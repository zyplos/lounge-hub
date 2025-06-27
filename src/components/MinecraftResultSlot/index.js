import MinecraftSlot from "../MinecraftSlot";

function MinecraftResultSlot({ name, image, amount, type = "large" }) {
  return (
    <MinecraftSlot name={name} image={image} amount={amount} type={type} />
  );
}

export default MinecraftResultSlot; 