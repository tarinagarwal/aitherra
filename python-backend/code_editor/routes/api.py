from typing import List
from fastapi import APIRouter, HTTPException
from code_editor.schemas.models import CodeSubmission, TestCase, ExecutionResult
from code_editor.services.code_executor import CodeExecutor
import logging

router = APIRouter(prefix="/api", tags=["code-execution"])
logger = logging.getLogger(__name__)


# Sample problem with test cases
SAMPLE_PROBLEM = {
    "id": "two-sum",
    "title": "Two Sum",
    "description": "Given an array of integers and a target, return indices of two numbers that add up to target.",
    "test_cases": [
        TestCase(input="2 7 11 15\n9", expected_output="0 1", is_hidden=False),
        TestCase(input="3 2 4\n6", expected_output="1 2", is_hidden=False),
        TestCase(input="3 3\n6", expected_output="0 1", is_hidden=False),
    ]
}


@router.post("/execute", response_model=ExecutionResult)
async def execute_code(submission: CodeSubmission):
    """
    Execute user code against test cases.
    
    Args:
        submission: Code submission with code and language
        
    Returns:
        ExecutionResult with test results
    """
    logger.info(f"Received code submission: {len(submission.code)} chars, language: {submission.language}")
    
    try:
        if submission.language.lower() != "python":
            logger.warning(f"Unsupported language: {submission.language}")
            raise HTTPException(
                status_code=400,
                detail="Only Python is currently supported"
            )
        
        if not submission.code.strip():
            logger.warning("Empty code submission")
            raise HTTPException(
                status_code=400,
                detail="Code cannot be empty"
            )
        
        # Get test cases for the problem
        test_cases = SAMPLE_PROBLEM["test_cases"]
        logger.info(f"Running {len(test_cases)} test cases")
        
        # Execute code
        executor = CodeExecutor(timeout=5.0)
        result = executor.execute_code(submission.code, test_cases)
        
        logger.info(f"Execution completed: {result.verdict}, {result.passed_tests}/{result.total_tests} passed")
        
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Code execution error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Code execution failed: {str(e)}"
        )


@router.get("/problem/{problem_id}")
async def get_problem(problem_id: str):
    """
    Get problem details.
    
    Args:
        problem_id: Problem identifier
        
    Returns:
        Problem details
    """
    logger.info(f"Fetching problem: {problem_id}")
    
    if problem_id != SAMPLE_PROBLEM["id"]:
        raise HTTPException(status_code=404, detail="Problem not found")
    
    return {
        "id": SAMPLE_PROBLEM["id"],
        "title": SAMPLE_PROBLEM["title"],
        "description": SAMPLE_PROBLEM["description"],
        "test_cases": [
            tc for tc in SAMPLE_PROBLEM["test_cases"] if not tc.is_hidden
        ]
    }


@router.get("/problems")
async def list_problems():
    """List all available problems."""
    logger.info("Listing all problems")
    return {
        "problems": [
            {
                "id": SAMPLE_PROBLEM["id"],
                "title": SAMPLE_PROBLEM["title"],
                "difficulty": "Easy"
            }
        ]
    }