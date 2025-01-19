function Card({data}) {
    console.log("it is ",data.price);
    
  return (
    <>
      <div className="flex justify-center mb-4">
        <div className="container w-80 h-max">
          <img
            className="bg-slate-100 w-full h-52 object-fill rounded-xl"
            src={data.image_url}
            alt="image not found"
          />
          <h1 className=" mt-4 font-normal text-2xl">{data.name}</h1>
          <h5 className="font-sans text-zinc-400">$ {data.price}</h5>
          <p className="font-sm leading-tight">
            {data.description}
          </p>
        </div>
      </div>
    </>
  );
}

export default Card;
