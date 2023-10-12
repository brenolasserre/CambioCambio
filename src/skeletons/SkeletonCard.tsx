import SkeletonElement from './SkeletonElement'

const SkeletonCard = () => {
    
    return (
        <div className="skeleton-wrapper">
                <SkeletonElement type={"title"} />
                <SkeletonElement type={"text"} />
                <SkeletonElement type={"text"} /> 
        </div>
    )
}

export default SkeletonCard