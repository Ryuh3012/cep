import { Button, Input, Textarea } from "@nextui-org/react";
import { LayoutDashboard } from "../../components/Navbar/Navbaar";
import Cookies from "universal-cookie";
import CryptoJS from "crypto-js";
import { SocketContext } from "../../SocketProvider";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";

const initialValues = { title: '', description: '' }
const Blog = () => {

    const { socket } = useContext(SocketContext)

    const [posts, setPosts] = useState([]);
    const cookies = new Cookies();
    const user = cookies.get('user')
    let decryptedData;
    if (user) {
        const bytes = CryptoJS.AES.decrypt(user, 'hola');
        decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

    }

    const { handleBlur, handleSubmit, handleChange, values: { title, description } } = useFormik({

        initialValues,
        onSubmit: async (data, { resetForm }) => {

            socket.emit('public', { title, description })
            setPosts([...posts, data])
            return resetForm()
        }

    })
    console.log(decryptedData);

    useEffect(() => {
        socket.on('enviarPublic', (data) =>  setPosts([...posts, data]) )
    }, [posts]);

    return (
        <LayoutDashboard>
            <div className="w-full">
                <div className="flex w-full">
                    <main className="flex flex-initial flex-col bg-white h-screen w-full p-2 ">
                        {!decryptedData ? null: decryptedData[0].rol === "Administrador" || decryptedData[0].rol === "Blogger" ? <section className="flex flex-col p-2 w-full shadow-md rounded-lg border-solid border-2 border-slate-200">
                            <div className="p-2">
                                <p className="font-medium text-lg text-left">{decryptedData[0].usuario}</p>
                                <p className="font-semibold text-2xl text-center">Crear publicación</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col justify-center gap-1 px-2">
                                    <div className="flex flex-col gap-2 px-1">

                                        <Input
                                            label="Título de la publicación"
                                            className="max-w-48"
                                            variant="bordered"
                                            name="title"
                                            value={title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Textarea
                                            placeholder="¿Que estas pensando, que quieres compartir?"
                                            variant="underlined"
                                            name="description"
                                            value={description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                        </Textarea>
                                    </div>
                                    <div className="flex justify-end items-end">

                                        <Button type="submit" >publicar</Button>
                                    </div>
                                </div>
                            </form>
                        </section> : null}


                        {posts.map((post, i ) => (
                            <article
                                key={i}
                                className="flex flex-col w-full p-2 shadow-md rounded-lg border-solid border-2 border-slate-200">
                                <p className="text-lg font-medium">{post.title}</p>
                                <div className="flex justify-center ">
                                    <p>{post.description}</p>
                                </div>
                            </article>


                        ))}

                    </main>
                </div>
            </div>
        </LayoutDashboard >
    );
}

export default Blog;
