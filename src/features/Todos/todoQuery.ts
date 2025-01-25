export default async function getTodos(pageIndex: number) {
  const limit: number = 5;
  const skip: number = pageIndex * 5;
  const data = await fetch(
    `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`
  ).then((res) => res.json());
  return data;
}
