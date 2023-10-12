import SkeletonElement from "../skeletons/SkeletonElement";

interface MobileCardProps {
  euroBlueValue: string;
  date: string;
}

function MobileCard({ euroBlueValue, date }: MobileCardProps) {

    const isDataLoaded = euroBlueValue !== '' && date !== '';

    function handleReloadClick(){
        window.location.reload();
    }

    return (
        <div className="mobileBottom">
        <span className="actualizado">
          {isDataLoaded ? (
            date === '' ? (
              <SkeletonElement type="line" />
            ) : (
            `Actualizado: ${date}`
            )
          ) : (
            <>Actualizado:` <SkeletonElement type="line" /></>
          )}
        </span>
        <button onClick={handleReloadClick}>Actualizar</button>
      </div>      
  );
}

export default MobileCard;
