export default async function getTodos(pageIndex: number) {
  const skip: number = pageIndex === 0 ? 0 : pageIndex * 5;
  const limit: number = 10;
  const data = await fetch(
    `http://localhost:3000/todos?skip=${skip}&limit=${limit}`
  ).then((res) => res.json());
  return data;
}