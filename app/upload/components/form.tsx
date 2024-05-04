"use client"
import axios from "axios";
import Image from "next/image";
import { useState, useRef } from "react";

  export default function UploadCourseForm() {
    const [title, setTitle] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [requirements, setRequirements] = useState([{ id: 1, value: "" }]);
    const [modules, setModules] = useState([
      { moduleId: Date.now(), title: "", lessons: [{ lessonId: Date.now(), title: "" }] }
    ]);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState("");
    const formRef = useRef<HTMLFormElement>(null);
  
    const addInput = () => {
      if (requirements.length > 0 && requirements[requirements.length - 1].value === "") {
        console.log("El último requisito ya está vacío.");
        return;
      }
      setRequirements(requirements => [...requirements, { id: Date.now(), value: "" }]);
    };
  
    const handleInputChange = (id: number, value: string) => {
      setRequirements(requirements =>
        requirements.map(req => (req.id === id ? { ...req, value } : req))
      );
    };
  
    const handleModuleTitleChange = (moduleId: number, newTitle: string) => {
      setModules(modules =>
        modules.map(module =>
          module.moduleId === moduleId ? { ...module, title: newTitle } : module
        )
      );
    };
  
    const handleLessonTitleChange = (moduleId: number, lessonId: number, newTitle: string) => {
      setModules(modules =>
        modules.map(module =>
          module.moduleId === moduleId
            ? {
                ...module,
                lessons: module.lessons.map(lesson =>
                  lesson.lessonId === lessonId ? { ...lesson, title: newTitle } : lesson
                ),
              }
            : module
        )
      );
    };
  
    const addLesson = (moduleId: number) => {
      setModules(modules =>
        modules.map(module =>
          module.moduleId === moduleId
            ? { ...module, lessons: [...module.lessons, { lessonId: Date.now(), title: "" }] }
            : module
        )
      );
    };
  
    const addModule = () => {
      setModules([...modules, { moduleId: Date.now(), title: "", lessons: [{ lessonId: Date.now(), title: "" }] }]);
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      if (!file) {
        setError("No se encuentra el archivo de imagen");
        return;
      }
  
      const formData = new FormData();
      formData.append("title", title);
      formData.append("introduction", introduction);
      formData.append("category", category);
      const requirementsJSON = JSON.stringify(requirements.map(req => req.value));
      formData.append("requirements", requirementsJSON);
      formData.append("price", price.toString());
      const modulesJSON = JSON.stringify(modules);
      formData.append("modules", modulesJSON);
      formData.append("image", file);      
  
      try {
        const res = await axios.post("/api/uploadCourse", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        window.location.href = "/"
      } catch (error) {
        console.error("Error uploading the file:", error);
        setError("Error al subir el archivo");
      }
    };
  
    const handleCancelFile = () => {
      formRef.current?.reset();
      setFile(null);
      setError("");
    };    

  return (
    <form onSubmit={handleSubmit} ref={formRef} className=" flex flex-col items-center gap-5 w-full mt-10 px-5">
      <fieldset className="flex flex-col justify-start items-center w-1/2 gap-3 ">
        <label htmlFor="title" className="text-start w-full text-[#ffffff] font-normal font-DMSans text-xl"> Titulo</label>
        <input 
          className="bg-[#ffffff19] h-10 w-[100%] px-2 font-DMSans font-light text-[#FFFFFF] outline-none" 
          type="text"
          maxLength={50} 
          required
          onChange={(e) => setTitle(e.target.value)}
          />
      </fieldset>
      {modules.map((module) => (
        <fieldset key={module.moduleId} className="flex flex-col gap-3 w-1/2">
          <label className="text-[#ffffff] font-normal text-xl">Título del módulo</label>
          <input
            className="bg-[#ffffff19] text-[#FFFFFF] outline-none px-2 h-10"
            type="text"
            onChange={e => handleModuleTitleChange(module.moduleId, e.target.value)}
            />
          {module.lessons.map((lesson, lessonIndex) => (
            <div key={lesson.lessonId} className="flex flex-col">
              <label className="text-[#ffffff] font-normal">Título de la lección</label>
              <input
                className="bg-[#ffffff19] text-[#FFFFFF] outline-none px-2 h-10"
                type="text"
                value={lesson.title}
                onChange={e => handleLessonTitleChange(module.moduleId, lesson.lessonId, e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={() => addLesson(module.moduleId)} className="px-4 py-2 bg-blue-500 text-white">
            Añadir lección
          </button>
        </fieldset>
      ))}
      <button type="button" onClick={addModule} className="px-4 py-2 mt-4 bg-green-500 text-white">
        Añadir módulo
      </button>

      <fieldset className="flex flex-col justify-start items-center w-1/2 gap-3 ">
        <label htmlFor="introduction" className="text-start w-full  text-[#ffffff] font-normal font-DMSans text-xl"> Introdución </label>
        <input 
          className="bg-[#ffffff19] h-10 w-[100%] px-2 font-DMSans font-light text-[#FFFFFF] outline-none" 
          type="text" 
          onChange={(e) => setIntroduction(e.target.value)}
        />
      </fieldset>

      <fieldset className="flex flex-col justify-start items-center w-1/2 gap-3 ">
        <label htmlFor="category" className="text-start w-full  text-[#ffffff] font-normal font-DMSans text-xl"> Categoría </label>
        <select 
          onChange={(e) => setCategory(e.target.value)}
          className="bg-[#ffffff19] h-10 w-[100%] px-2 font-DMSans font-light text-[#FFFFFF] outline-none" 
        >
        <option className="text-[#000000] text-xs font-DMSanst font-bold" value="Marketing">Marketing</option>
        <option className="text-[#000000] text-xs font-DMSanst font-bold" value="Data Base">Data Base</option>
        <option className="text-[#000000] text-xs font-DMSanst font-bold" value="Back-end">Back-end</option>
        <option className="text-[#000000] text-xs font-DMSanst font-bold" value="Front-end">Front-end</option>
        </select>
      </fieldset>

      <fieldset className="flex flex-col justify-start items-center w-1/2 gap-3">
        <label htmlFor="requirements" className="text-start w-full text-[#ffffff] font-normal font-DMSans text-xl">Requisito</label>
        {requirements.map((input, index) => (
          <input
            key={input.id}
            className="bg-[#ffffff19] h-10 w-[100%] px-2 font-DMSans font-light text-[#FFFFFF] outline-none"
            type="text"
            id={`input-requirement-${input.id}`}
            value={input.value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
          />
        ))}
        <p className="cursor-pointer text-[#ffffff]" onClick={addInput}>Más</p>
      </fieldset>


      <fieldset className="flex flex-row justify-around items-center w-1/2 gap-3 ">
        <label htmlFor="price" className="w-[50%] text-[#ffffff] font-normal font-DMSans text-xl ">Precio del curso</label>
        <input 
          className="bg-[#ffffff19] h-10 px-2 font-DMSans font-light text-[#FFFFFF] outline-none w-[20%]" 
          type="number"
          onChange={(e) => setPrice(+e.target.value)}
        />
      </fieldset>

      <fieldset className="flex flex-col justify-start items-center h-full w-1/2 gap-3 px-3 py-3">
        <div className="w-full flex flex-row">
          <label htmlFor="image"  className="text-start w-full text-[#ffffff] font-normal font-DMSans text-xl"> Sube una imagen</label> 
        </div>
        <div className="border-[1px] border-Light-Purple py-5 px-3 flex flex-row justify-evenly items-center w-full">
        <input 
          type="file" 
          name="file" 
          onChange={(e) => { if (e.target.files && e.target.files[0]) {
                              setFile(e.target.files[0]);
                            } else {
                              setFile(null); 
                            }}
          }
          className="text-[#FFFFFF]"  />
        {file && (
        <Image 
          width={250} 
          height={250} 
          src={URL.createObjectURL(file)} 
          alt="Imagen cargada" 
          className=" object-cover h-36 bg-Light-Orange "
        />
      )}
      {file && ( <p onClick={handleCancelFile} className="text-[#cc4242]  font-normal font-DMSans text-xl cursor-pointer hover:font-bold"> Cancelar </p> ) }
        </div>
      </fieldset>
      
      <button type="submit" className="bg-Light-Orange text-[#ffffff] font-normal font-DMSans text-xl px-3 py-1">Subir Curso</button>
          <p className=" bg-Light-Green">{error}</p>
    </form>
  );
}