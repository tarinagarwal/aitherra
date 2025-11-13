"""Pydantic models for request/response schemas."""
from typing import List, Optional
from pydantic import BaseModel, Field


class TestCase(BaseModel):
    """Test case model."""
    input: str = Field(..., description="Input for the test case")
    expected_output: str = Field(..., description="Expected output")
    is_hidden: bool = Field(default=False, description="Whether test case is hidden")


class CodeSubmission(BaseModel):
    """Code submission model."""
    code: str = Field(..., description="User submitted code")
    language: str = Field(default="python", description="Programming language")
    problem_id: Optional[str] = Field(None, description="Problem identifier")


class TestCaseResult(BaseModel):
    """Individual test case result."""
    input: str
    expected_output: str
    actual_output: str
    passed: bool
    error: Optional[str] = None
    execution_time: float


class ExecutionResult(BaseModel):
    """Code execution result."""
    success: bool
    total_tests: int
    passed_tests: int
    failed_tests: int
    test_results: List[TestCaseResult]
    verdict: str  # "Accepted", "Wrong Answer", "Runtime Error", "Time Limit Exceeded"
    overall_execution_time: float