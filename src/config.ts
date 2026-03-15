export const config = {
  players: import.meta.env.VITE_PLAYERS.split(",")
    .slice(0, 2)
    .map((name) => ({
      id: name.trim().toLowerCase(),
      label: name.trim(),
    })),
};
