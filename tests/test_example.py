# content of test_example.py

def add_numbers(a, b):
    return a + b

def test_add_positive_numbers():
    assert add_numbers(2, 3) == 5

def test_add_negative_numbers():
    assert add_numbers(-1, -5) == -6

def test_add_zero():
    assert add_numbers(0, 7) == 7
