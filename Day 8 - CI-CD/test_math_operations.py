# test_math_operations.py

import pytest
from math_operations import add, subtract, multiply, divide

def test_add():
    assert add(3, 2) == 5
    assert add(-1, 1) == 0

def test_subtract():
    assert subtract(5, 3) == 2
    assert subtract(3, 5) == -2

def test_multiply():
    assert multiply(4, 3) == 12
    assert multiply(0, 10) == 0

def test_divide():
    assert divide(10, 2) == 5
    with pytest.raises(ValueError):
        divide(10, 0)
