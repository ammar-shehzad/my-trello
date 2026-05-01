import { supabase } from "@/utils/supabase/client";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface ICardName{
  name: string;
}



interface AddNewCardsDialogeProps {
Cardmodel:HTMLDialogElement;
cardName:ICardName;
setCardName:Dispatch<SetStateAction<ICardName>>;
err:any;
setErr:Dispatch<SetStateAction<any>>;





}

const AddNewCardsDialoge: React.FC<AddNewCardsDialogeProps> = ({Cardmodel,cardName,setCardName,err,setErr}) => {

  const handleInputCardChange = (e: any) => {
    setCardName({ name: e.target.value });
  };

  const handleCardSubmit = async () => {
    if (cardName.name == "") {
      toast.error("Fill The Feild");
    } else {
      let randomCardColor = Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0");

      let randomColorComplete = "#" + randomCardColor;

      const { error } = await supabase.from("myCards").insert({
        cardName: cardName.name,
        userId: localStorage.getItem("user"),
      });

      if (error) {
        toast.error(error.message);
      } else {
        setCardName({ name: "" });
        setErr("");
        Cardmodel.close()
        toast.success("Card Added Successfully");

      }
    }
  };


  return (
    <>
      <dialog
        id="Cardmodel"
        className="w-full max-w-100 h-fit max-h-[90vh] overflow-y-auto rounded-lg p-6 m-auto"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <div className="grid grid-cols-12 ">
                <div className="col-span-10 ">
                  <h3 className="font-bold text-2xl text-[#020344]">
                    Enter A New Card
                  </h3>
                </div>
                <div className="col-span-2 flex justify-end">
                  <span
                    className="font-bold"
                    style={{ cursor: "default" }}
                    onClick={() => {
                      Cardmodel.close();
                    }}
                  >
                    X
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="col-span-4"></div> */}
            <div className="col-span-12">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCardSubmit();
                }}
              >
                <div className="flex flex-col space-y-1 my-8">
                  <input
                    type="text"
                    // className="block w-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white bg-white/10 text-white placeholder-white/70 border border-white/20 rounded backdrop-blur-sm"
                    className="block w-full px-4 py-2 text-sm 
                    text-black placeholder:text-gray-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020344]"
                    placeholder="Your Task Here"
                    value={cardName?.name}
                    onChange={handleInputCardChange}
                  />

                  <button
                    type="submit"
                    className="block px-4 py-2 my-3 bg-linear-to-r from-[#020344] to-[#28b8d5] text-white border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                  >
                    Add Card
                  </button>

                  <button
                    type="button"
                    className="font-bold px-4 py-2  mx-1 bg-gray-200 text-black border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                    style={{ cursor: "default" }}
                    onClick={() => {
                      Cardmodel.close();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
            {/* <div className="col-span-4"></div> */}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddNewCardsDialoge;
