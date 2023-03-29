type TodosProps = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
const pullData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const data: TodosProps[] = await res.json();
  return data;
};
const pullTodo = async (id: string) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/" + id);
  const data: TodosProps = await res.json();
  return data;
};
export default function ISGPage<NextPage>({ data }: any) {
  return (
    <>
      <section
        style={{
          backgroundColor: "black",
          color: "white",
          borderRadius: "5px",
          fontFamily: "sans-serif",
          padding: "10px",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          border: "solid 1px white",
        }}
      >
        <h1>Server Static Props</h1>
        <h3>Tareas:</h3>
        <div>
          <h4>Title: {data.title}</h4>
          <h5>UserID: {data.id}</h5>
        </div>
      </section>
    </>
  );
}
export const getStaticPaths = async () => {
  const todos = await pullData();
  const paths = todos.map((todo) => ({
    params: { id: todo.id.toString() },
  }));
  return { paths, fallback: "blocking" };
};
export const getStaticProps = async (context: any) => {
  const data: TodosProps = await pullTodo(context.params.id as string);
  return {
    props: { data },
    revalidate: 1000,
  };
};
