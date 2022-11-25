import { FaTrash} from 'react-icons/fa';

export default function Todo(props: any) {
    return (
        <div className={`todo flex items-center h-10 mb-0.5 shadow w-mx tems-center justify-between p-2 ${props.isComplete ? 'bg-completedBackground' : ''}`}>
            <div className={`todo-text ${props.isComplete ? 'line-through' : ''}`}>{props.name}</div>
            <div className="buttons flex flex">
                <button onClick={() => props.onClickFunc(props.id)} className={`complete-btn h-8 w-24 rounded-lg mr-12 ${props.isComplete ? 'bg-undoOrange' : 'bg-completedGreen'}`}>{props.isComplete ? 'Undo' : 'Complete'}</button>
                <button onClick={() => props.deleteFunc(props.id)} className="delete p-1 rounded bg-deleteRed">
                    <FaTrash />
                </button>
            </div>
        </div>
    )
}

interface Todo  {
    id: string
    name: string
    isComplete: boolean
}

// completedGreen