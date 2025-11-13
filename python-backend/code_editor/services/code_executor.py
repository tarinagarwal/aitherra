import sys
import io
import time
from typing import List
from contextlib import redirect_stdout, redirect_stderr
from code_editor.schemas.models import TestCase, TestCaseResult, ExecutionResult


class CodeExecutor:
    """Execute user code against test cases."""
    
    def __init__(self, timeout: float = 5.0):
        """Initialize code executor with timeout."""
        self.timeout = timeout
    
    def execute_code(self, code: str, test_cases: List[TestCase]) -> ExecutionResult:
        """
        Execute code against test cases.
        
        Args:
            code: User submitted code
            test_cases: List of test cases
            
        Returns:
            ExecutionResult with all test case results
        """
        test_results: List[TestCaseResult] = []
        passed_count = 0
        failed_count = 0
        total_time = 0.0
        verdict = "Accepted"
        
        for test_case in test_cases:
            result = self._run_single_test(code, test_case)
            test_results.append(result)
            total_time += result.execution_time
            
            if result.passed:
                passed_count += 1
            else:
                failed_count += 1
                if result.error:
                    verdict = "Runtime Error"
                else:
                    verdict = "Wrong Answer"
        
        return ExecutionResult(
            success=failed_count == 0,
            total_tests=len(test_cases),
            passed_tests=passed_count,
            failed_tests=failed_count,
            test_results=test_results,
            verdict=verdict,
            overall_execution_time=total_time
        )
    
    def _run_single_test(self, code: str, test_case: TestCase) -> TestCaseResult:
        """
        Run code against a single test case.
        
        Args:
            code: User code
            test_case: Test case to run
            
        Returns:
            TestCaseResult
        """
        start_time = time.time()
        actual_output = ""
        error_msg = None
        passed = False
        
        try:
            # Capture stdout and stderr
            stdout_capture = io.StringIO()
            stderr_capture = io.StringIO()
            
            # Split input lines for multiple inputs
            input_lines = test_case.input.strip().split('\n')
            input_iter = iter(input_lines)
            
            # Create custom input function
            def custom_input(prompt=''):
                try:
                    return next(input_iter)
                except StopIteration:
                    return ''
            
            with redirect_stdout(stdout_capture), redirect_stderr(stderr_capture):
                # Create a safe execution environment
                exec_globals = {
                    '__builtins__': __builtins__,
                    'input': custom_input,
                    'print': print,
                }
                
                # Execute the code
                exec(code, exec_globals)
            
            actual_output = stdout_capture.getvalue().strip()
            stderr_output = stderr_capture.getvalue().strip()
            
            if stderr_output:
                error_msg = stderr_output
            
            # Compare output (normalize whitespace)
            expected = test_case.expected_output.strip()
            actual = actual_output.strip()
            
            # Try exact match first
            passed = actual == expected
            
            # If not exact, try comparing after normalizing all whitespace
            if not passed:
                expected_normalized = ' '.join(expected.split())
                actual_normalized = ' '.join(actual.split())
                passed = expected_normalized == actual_normalized
            
        except Exception as e:
            error_msg = f"{type(e).__name__}: {str(e)}"
            actual_output = ""
            passed = False
        finally:
            # Restore stdin (just in case)
            sys.stdin = sys.__stdin__
        
        execution_time = time.time() - start_time
        
        return TestCaseResult(
            input=test_case.input,
            expected_output=test_case.expected_output,
            actual_output=actual_output if actual_output else "(No output)",
            passed=passed,
            error=error_msg,
            execution_time=execution_time
        )