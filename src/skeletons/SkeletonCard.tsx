import SkeletonElement from './SkeletonElement'

const SkeletonCard = () => {
    
    return (
        <div className="skeleton-wrapper">
            <div className="skeleton-article">
                <SkeletonElement type={"title"} />
                <SkeletonElement type={"text"} />
                <SkeletonElement type={"text"} /> 
            </div>
        </div>
    )
}

export default SkeletonCard